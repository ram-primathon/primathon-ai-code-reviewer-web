#!/bin/bash

# Change this to the path of the local folder you want to copy to the remote server
LOCAL_FOLDER_PATH="/Users/ram/Desktop/Project/primathon-ai-code-reviewer-web/.next"
# List of additional local files to copy to the remote server
LOCAL_FILES=(
  "/Users/ram/Desktop/Project/primathon-ai-code-reviewer-web/package.json" 
  "/Users/ram/Desktop/Project/primathon-ai-code-reviewer-web/.env.local"
  "/Users/ram/Desktop/Project/primathon-ai-code-reviewer-web/start.sh"
) 

# Change this to your remote server username
REMOTE_USER="ubuntu"
# Change this to your remote server hostname or IP address
REMOTE_HOST="13.126.36.221" 
# Change this to the path on the remote server where you want to copy the folder
REMOTE_FOLDER_PATH="/home/ubuntu/projects/primathon-ai-code-reviewer-web"   
REMOTE_START_SCRIPT="/home/ubuntu/projects/primathon-ai-code-reviewer-web/start.sh"   # Change this to the path of the start script on the remote server

# Change this to the path of your SSH private key
SSH_KEY_PATH="$HOME/.ssh/primathon"
# Change this if your SSH server uses a different port
SSH_PORT=22


# Function to copy a folder
copy_folder() {
  echo "Copying folder $LOCAL_FOLDER_PATH to $REMOTE_USER@$REMOTE_HOST:$REMOTE_FOLDER_PATH"
  scp -r -P $SSH_PORT -i $SSH_KEY_PATH "$LOCAL_FOLDER_PATH" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_FOLDER_PATH"
  if [ $? -eq 0 ]; then
    echo "Folder copied successfully."
  else
    echo "Failed to copy the folder."
    exit 1
  fi
}

# Function to copy additional files
copy_files() {
  for file in "${LOCAL_FILES[@]}"; do
    if [ -f "$file" ]; then
      echo "Copying file $file to $REMOTE_USER@$REMOTE_HOST:$REMOTE_FOLDER_PATH"
      scp -P $SSH_PORT -i $SSH_KEY_PATH "$file" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_FOLDER_PATH"
      if [ $? -eq 0 ]; then
        echo "File $file copied successfully."
      else
        echo "Failed to copy file $file."
        exit 1
      fi
    else
      echo "File $file does not exist."
      exit 1
    fi
  done
}

# Function to run the start script on the remote server
run_start_script() {
  echo "Running start script on $REMOTE_USER@$REMOTE_HOST"
  ssh -p $SSH_PORT -i $SSH_KEY_PATH "$REMOTE_USER@$REMOTE_HOST" "bash $REMOTE_START_SCRIPT"
  if [ $? -eq 0 ]; then
    echo "Start script executed successfully."
  else
    echo "Failed to execute start script."
    exit 1
  fi
}

# Function to run the restart script on the remote server
run_restart_script() {
  echo "Running start script on $REMOTE_USER@$REMOTE_HOST"
  ssh -p $SSH_PORT -i $SSH_KEY_PATH "$REMOTE_USER@$REMOTE_HOST" "bash $REMOTE_START_SCRIPT"
  if [ $? -eq 0 ]; then
    echo "Start script executed successfully."
  else
    echo "Failed to execute start script."
    exit 1
  fi
}

# Add SSH key to the agent
eval "$(ssh-agent -s)"
ssh-add "$SSH_KEY_PATH"

# Check if the SSH key was added successfully
if [ $? -ne 0 ]; then
  echo "Failed to add SSH key to the agent."
  exit 1
fi

# # Copy the folder
copy_folder

# # Copy the additional files
copy_files

# Run the start script on the remote server
# run_start_script

# Run the restart script on the remote server
# run_restart_script

# Kill the SSH agent
ssh-agent -k
