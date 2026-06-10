(function () {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');

  const els = {
    consent: document.getElementById('intake-consent'),
    consentProceed: document.getElementById('intake-consent-proceed'),
    chat: document.getElementById('intake-chat'),
    messages: document.getElementById('chat-messages'),
    form: document.getElementById('chat-form'),
    input: document.getElementById('chat-input'),
    send: document.getElementById('chat-send'),
    complete: document.getElementById('chat-complete'),
    status: document.getElementById('chat-status'),
    done: document.getElementById('intake-done'),
    error: document.getElementById('intake-error')
  };

  function show(section) {
    ['consent', 'chat', 'done', 'error'].forEach(name => {
      if (els[name]) els[name].hidden = (name !== section);
    });
  }

  function renderMessage(role, content) {
    const el = document.createElement('div');
    el.className = `msg msg-${role}`;
    const body = document.createElement('div');
    body.className = 'msg-body';
    body.textContent = content;
    el.appendChild(body);
    els.messages.appendChild(el);
    els.messages.scrollTop = els.messages.scrollHeight;
    return el;
  }

  function setStatus(text, kind) {
    els.status.textContent = text || '';
    els.status.className = kind ? `status-${kind}` : '';
  }

  function setBusy(busy) {
    els.send.disabled = busy;
    els.complete.disabled = busy;
    els.input.disabled = busy;
  }

  async function api(action, payload) {
    const res = await fetch('/api/intake', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, token, ...payload })
    });
    const data = await res.json().catch(() => ({ error: 'Bad response' }));
    if (!res.ok) throw new Error(data.message || data.error || 'Request failed');
    return data;
  }

  async function boot() {
    if (!token) {
      show('error');
      return;
    }
    try {
      const data = await api('load', {});
      if (data.session?.status === 'completed') {
        show('done');
        return;
      }
      if (!data.messages || data.messages.length === 0) {
        show('consent');
        return;
      }
      show('chat');
      data.messages.forEach(m => renderMessage(m.role, m.content));
    } catch (err) {
      console.error('boot failed', err);
      show('error');
    }
  }

  els.consentProceed?.addEventListener('click', async () => {
    show('chat');
    setBusy(true);
    setStatus('Starting...', 'loading');
    try {
      const data = await api('message', {
        message: 'Hi Marko — ready to start the interview. English please, unless you recommend German.'
      });
      renderMessage('user', 'Hi Marko — ready to start the interview. English please, unless you recommend German.');
      renderMessage('assistant', data.message);
      setStatus('');
      els.input.focus();
    } catch (err) {
      console.error(err);
      setStatus('Could not start — please try again or email marko.stokic@proton.me.', 'error');
    } finally {
      setBusy(false);
    }
  });

  els.form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = els.input.value.trim();
    if (!text) return;
    renderMessage('user', text);
    els.input.value = '';
    setBusy(true);
    setStatus('Thinking...', 'loading');
    try {
      const data = await api('message', { message: text });
      renderMessage('assistant', data.message);
      setStatus('');
      els.input.focus();
    } catch (err) {
      console.error(err);
      setStatus(`Error: ${err.message}. Your message was not saved — please try again.`, 'error');
    } finally {
      setBusy(false);
    }
  });

  els.input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      els.form.requestSubmit();
    }
  });

  els.complete?.addEventListener('click', async () => {
    const confirmed = confirm('Mark the interview as complete? You can still email Marko with follow-ups, but you won\'t be able to add more here.');
    if (!confirmed) return;
    setBusy(true);
    setStatus('Submitting...', 'loading');
    try {
      await api('complete', {});
      show('done');
    } catch (err) {
      console.error(err);
      setStatus(`Could not submit: ${err.message}`, 'error');
      setBusy(false);
    }
  });

  boot();
})();
