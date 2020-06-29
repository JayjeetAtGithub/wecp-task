# test case generator [EOL]

## Running instructions

> NOTE: Make sure `node` and `g++` is installed.

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

## Using the library

1. Define an input generator function.

```js
const input_generator_function = function() {
            // return the input in the form of a string.
            // .
            // .
            return input_string;
}
```

2. Pass the input generator function along with other params to the `TestCaseGenerator`.

```js
let test_case_generator = new TestCaseGenerator(
    "<path/to/program/binary>",
    "<path/to/test case input file>",
    "<path/to/test case output file>",
    input_generator_function,
    number_of_test_cases_to_generate)
```

3. Call the `generate` method.

```js
test_case_generator.generate()
```

## Generated test case files for the sample programs
* `input_one.txt`, `output_one.txt` : Test cases for `example/sample_program_one.cpp`.
* `input_two.txt`, `output_two.txt` : Test cases for `example/sample_program_two.cpp`.
