#!/bin/bash
lang=$1
exit_status=0
start_time=0
end_time=0

# Check the language and execute the source code accordingly
if [ $lang == "cpp" ] || [ $lang == "c" ]; then
    g++ "source_code.$lang" -o executable
    ulimit -v $MEMORY_LIMIT_MB -t $TIMEOUT_SECONDS
    start_time=$(date +%s.%N)
    ./executable < input.txt 2> output.txt
    exit_status=$?
    end_time=$(date +%s.%N)

elif [ $lang == "java" ]; then
    javac source_code.java
    ulimit -v $MEMORY_LIMIT_MB -t $TIMEOUT_SECONDS
    start_time=$(date +%s.%N)
    java source_code < input.txt 2> output.txt
    exit_status=$?
    end_time=$(date +%s.%N)

elif [ $lang == "py" ]; then
    ulimit -v $MEMORY_LIMIT_MB -t $TIMEOUT_SECONDS
    start_time=$(date +%s.%N)
    python3 source_code.py < input.txt 2> output.txt
    exit_status=$?
    end_time=$(date +%s.%N)

else
    echo "Invalid file extension"
    exit 1
fi

execution_time=$(echo "($end_time - $start_time) * 1000" | bc)
echo "Execution Time: $execution_time ms"

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