# test case generator

## Running instructions:

1. Clone the repository.
```
git clone https://github.com/JayjeetAtGithub/wecp-task
cd wecp-task/
```

2. Compile the sample C++ programs and keep the generated binaries in a `bin/` directory.
```
mkdir -p bin/
g++ example/sample_program_one.cpp -o bin/sample_program_one
g++ example/sample_program_two.cpp -o bin/sample_program_two
```

3. Run the code.
```
node index.js
```

## Generated test cases files:
* `input_one.txt`, `output_one.txt` : Test cases for `example/sample_program_one.cpp`.
* `input_two.txt`, `output_two.txt` : Test cases for `example/sample_program_two.cpp`.
