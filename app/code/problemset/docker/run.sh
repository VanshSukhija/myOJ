#!/bin/bash
lang=$1
# echo "language: $lang"

# Check the language and execute the source code accordingly
if [ $lang == "cpp" ] || [ $lang == "c" ]; then
    g++ "source_code.$lang" -o executable
    ulimit -v $MEMORY_LIMIT_MB -t $TIMEOUT_SECONDS
    ./executable < input.txt 2> output.txt

elif [ $lang == "java" ]; then
    javac source_code.java
    ulimit -v $MEMORY_LIMIT_MB -t $TIMEOUT_SECONDS
    java source_code < input.txt 2> output.txt

elif [ $lang == "py" ]; then
    ulimit -v $MEMORY_LIMIT_MB -t $TIMEOUT_SECONDS
    python3 source_code.py < input.txt 2> output.txt

else
    echo "Invalid file extension"
    exit 1
fi

# Capture the exit status of the last command executed
exit_status=$?

# Check the exit status of the program
if [ $exit_status -eq 124 ]; then
    echo "Time limit exceeded"
    exit 0
elif [ $exit_status -eq 137 ]; then
    echo "Memory limit exceeded"
    exit 0
fi

# Return the output of the program to stdout
cat output.txt