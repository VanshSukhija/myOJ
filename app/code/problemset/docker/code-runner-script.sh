#!/bin/bash

lang=$1
TIMEOUT_SECONDS=$2
MEMORY_LIMIT_MB=$3
exit_status=0
time_taken_in_seconds=0
memory_used=0

# Check the language and execute the source code accordingly
if [ $lang == "cpp" ] || [ $lang == "c" ]; 
then
    g++ "Main.$lang" -o Main -std=c++17
    if [ $? -ne 0 ]; then
        echo "Compilation Error"
        exit 1
    fi

    ulimit -SHv $MEMORY_LIMIT_MB -t $TIMEOUT_SECONDS
    /usr/bin/time -f "time_taken %e\nmemory_used %M\nexit_status %x" ./Main < input.txt > output.txt 2> time_memory.txt
        
    if [ $(grep "bad_alloc" time_memory.txt | wc -l) -gt 0 ]; then
        echo "Memory Limit Exceeded"
        exit 1
    elif [ $(grep "Command terminated" time_memory.txt | wc -l) -gt 0 ]; then
        signal=$(grep "Command terminated" time_memory.txt | cut -d ' ' -f 5)
        if [ $signal == 9 ]; then
            echo "Time Limit Exceeded"
        else
            grep -w $signal signals.txt | cut -d ' ' -f 2
        fi
        exit 1
    elif [ $(head -n -3 time_memory.txt | wc -l) -gt 0 ]; then
        head -n -3 time_memory.txt
        exit 1
    else
        time_taken_in_seconds=$(grep "time_taken" time_memory.txt | cut -d ' ' -f 2)
        memory_used=$(grep "memory_used" time_memory.txt | cut -d ' ' -f 2)
        exit_status=$(grep "exit_status" time_memory.txt | cut -d ' ' -f 2)
    fi

    if [ $exit_status -ne 0 ]; then
        echo "Runtime Error"
        exit 1
    elif [ $memory_used -gt $MEMORY_LIMIT_MB ]; then
        echo "Memory Limit Exceeded"
        exit 1
    fi

elif [ $lang == "java" ]; 
then
    javac Main.java
    if [ $? -ne 0 ]; then
        echo "Compilation Error"
        exit 1
    fi

    ulimit -SHu $MEMORY_LIMIT_MB -t $TIMEOUT_SECONDS
    /usr/bin/time -f "time_taken %e\nmemory_used %M\nexit_status %x" java Main < input.txt > output.txt 2> time_memory.txt

    if [ $(grep "Command terminated" time_memory.txt | wc -l) -gt 0 ]; then
        signal=$(grep "Command terminated" time_memory.txt | cut -d ' ' -f 5)
        if [ $signal == 9 ]; then
            echo "Time Limit Exceeded"
        else
            grep -w $signal signals.txt | cut -d ' ' -f 2
        fi
        exit 1
    elif [ $(head -n -3 time_memory.txt | wc -l) -gt 0 ]; then
        head -n -3 time_memory.txt
        exit 1
    else
        time_taken_in_seconds=$(grep "time_taken" time_memory.txt | cut -d ' ' -f 2)
        memory_used=$(grep "memory" time_memory.txt | cut -d ' ' -f 2)
        exit_status=$(grep "exit" time_memory.txt | cut -d ' ' -f 2)
    fi

    if [ $exit_status -ne 0 ]; then
        echo "Runtime Error"
        exit 1
    elif [ $memory_used -gt $MEMORY_LIMIT_MB ]; then
        echo "Memory Limit Exceeded"
        exit 1
    fi

elif [ $lang == "py" ];
then
    ulimit -SHv $MEMORY_LIMIT_MB -t $TIMEOUT_SECONDS
    /usr/bin/time -f "time_taken %e\nmemory_used %M\nexit_status %x" python3 Main.py < input.txt > output.txt 2> time_memory.txt
    
    if [ $(grep "MemoryError" time_memory.txt | wc -l) -gt 0 ]; then
        echo "Memory Limit Exceeded"
        exit 1
    elif [ $(grep "Command terminated" time_memory.txt | wc -l) -gt 0 ]
    then
        signal=$(grep "Command terminated" time_memory.txt | cut -d ' ' -f 5)
        if [ $signal == 9 ]; then
            echo "Time Limit Exceeded"
        else
            grep -w $signal signals.txt | cut -d ' ' -f 2
        fi
        exit 1 
    elif [ $(head -n -3 time_memory.txt | wc -l) -gt 0 ]; then
        head -n -3 time_memory.txt
        exit 1
    else
        time_taken_in_seconds=$(grep "time_taken" time_memory.txt | cut -d ' ' -f 2)
        memory_used=$(grep "memory_used" time_memory.txt | cut -d ' ' -f 2)
        exit_status=$(grep "exit_status" time_memory.txt | cut -d ' ' -f 2)
    fi

    if [ $exit_status -ne 0 ]; then
        echo "Runtime Error"
        exit 1
    elif [ $memory_used -gt $MEMORY_LIMIT_MB ]; then
        echo "Memory Limit Exceeded"
        exit 1
    fi

else
    echo "Invalid file extension"
    exit 1
fi

# Return the output of the program to stdout
cat output.txt