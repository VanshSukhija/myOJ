#!/bin/bash

g++ source_code.cpp -o executable

# Run the program with time and memory limits

#memory limit ko handle nhi kar pa rha
ulimit -m $MEMORY_LIMIT_MB
timeout $TIMEOUT_SECONDS ./executable < input.txt 2> output.txt

# Check the exit status of the program
if [ $? -eq 124 ]; then
    echo "Time limit exceeded"
    exit 0
elif [ $? -eq 137 ]; then
    echo "Memory limit exceeded"
    exit 0
fi

# Display the program's output (e.g., for debugging)
cat output.txt
