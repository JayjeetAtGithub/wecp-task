const spawnSync = require('child_process').spawnSync;
const fs = require('fs');


class TestCaseGenerator {
        // Base class for generating test cases randomly from given constraints
        constructor(
                path_to_binary, 
                path_to_input_file,
                path_to_output_file,
                num_test_cases,
                constraints) {
                
                this.path_to_binary = path_to_binary
                this.path_to_input_file = path_to_input_file
                this.path_to_output_file = path_to_output_file
                this.num_test_cases = num_test_cases
                this.constraints = constraints

                this.inputs = new Array();
                this.outputs = new Array();

                fs.closeSync(fs.openSync(this.path_to_input_file, 'w'));
                fs.closeSync(fs.openSync(this.path_to_output_file, 'w'));
        }

        // method to generate a random number in a given range
        get_rand(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min; 
        }

        // method to generate the inputs of the test cases
        generate_input() {
                throw new Error("To be implemented in sub class.");
        }

        // method to generate the outputs of the test cases
        generate_output(input_string) {
                const proc = spawnSync(this.path_to_binary, { 'input': input_string });
                const output_string = proc.stdout.toString();
                this.outputs.push(output_string);
                return output_string
        }
        
        // method to generate inputs and outputs and append them to file
        generate() {
                for (let i = 0; i < this.num_test_cases; i++) {
                        const input_string = this.generate_input();
                        const output_string = this.generate_output(input_string);
                        
                        fs.appendFileSync(this.path_to_input_file, input_string + "\n")
                        fs.appendFileSync(this.path_to_output_file, output_string + "\n");
                }
        }
}


class TestCaseGeneratorTypeOne extends TestCaseGenerator {
        // Generate array lengths and the corresponding elements of the array.
        constructor(...args) {
                super(...args);
        }

        generate_input() {
                const arr_len = this.get_rand(
                        this.constraints.lower_bound_arr_len,
                        this.constraints.upper_bound_arr_len)

                let arr_elements = new Array();
                for (let i = 0; i < arr_len; i++) {
                        arr_elements.push(this.get_rand(
                                this.constraints.lower_bound_arr_elem, 
                                this.constraints.upper_bound_arr_elem)
                        );
                }
                
                const input_string = arr_len.toString() + " " + arr_elements.join(" ");
                this.inputs.push(input_string);
                return input_string;
        }
}


class TestCaseGeneratorTypeTwo extends TestCaseGenerator {
        // Generate a single integer.
        constructor(...args) {
                super(...args);
        }

        generate_input() {
                const num = this.get_rand(
                        this.constraints.lower_bound_num,
                        this.constraints.upper_bound_num)
                
                const input_string = num.toString();
                this.inputs.push(input_string);
                return input_string;
        }
}

// test
let test_case_generator_type_one = new TestCaseGeneratorTypeOne(
        "./bin/sample_program_one",
        "./input_one.txt",
        "./output_one.txt",
        10,
        {
                'lower_bound_arr_len': 100, 
                'upper_bound_arr_len': 200,
                'lower_bound_arr_elem': 1,
                'upper_bound_arr_elem': 10000
        }
)

let test_case_generator_type_two = new TestCaseGeneratorTypeTwo(
        "./bin/sample_program_two",
        "./input_two.txt",
        "./output_two.txt",
        5,
        {
                'lower_bound_num': 10,
                'upper_bound_num': 10000
        }
)

test_case_generator_type_one.generate();
test_case_generator_type_two.generate();
