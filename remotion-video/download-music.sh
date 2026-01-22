#!/bin/bash
# Download a royalty-free background music track
# Using Pixabay's free music (no attribution required)

mkdir -p src/assets

# Download upbeat tech/corporate background music
curl -L "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" -o src/assets/background-music.mp3

echo "✅ Background music downloaded to src/assets/background-music.mp3"
