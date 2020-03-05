const { TestCaseGenerator } = require('./lib');

const input_generator_one = function() {
            const arr_len = TestCaseGenerator.get_rand(100, 200);
            let arr_elements = new Array();
            for (let i = 0; i < arr_len; i++) {
                    arr_elements.push(TestCaseGenerator.get_rand(1, 1000));
            }
            const input_string = arr_len.toString() + " " + arr_elements.join(" ");
            return input_string;
        }

const input_generator_two = function() {
            const num = TestCaseGenerator.get_rand(10, 10000);
            const input_string = num.toString();
            return input_string;
}

// test
let test_case_generator_type_one = new TestCaseGenerator(
    "./bin/sample_program_one",
    "./input_one.txt",
    "./output_one.txt",
    input_generator_one,
    10)

let test_case_generator_type_two = new TestCaseGenerator(
    "./bin/sample_program_two",
    "./input_two.txt",
    "./output_two.txt",
    input_generator_two,
    5)

test_case_generator_type_one.generate();
test_case_generator_type_two.generate();
