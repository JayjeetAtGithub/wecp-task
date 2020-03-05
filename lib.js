const spawnSync = require('child_process').spawnSync;
const fs = require('fs');

class TestCaseGenerator {
        // Base class for generating test cases randomly from given constraints
        constructor(
                path_to_binary, 
                path_to_input_file,
                path_to_output_file,
                input_generator,
                num_test_cases,
                constraints) {
                
                this.path_to_binary = path_to_binary
                this.path_to_input_file = path_to_input_file
                this.path_to_output_file = path_to_output_file
                this.input_generator = input_generator
                this.num_test_cases = num_test_cases
                this.constraints = constraints

                fs.closeSync(fs.openSync(this.path_to_input_file, 'w'));
                fs.closeSync(fs.openSync(this.path_to_output_file, 'w'));
        }

        // method to generate a random number in a given range
        static get_rand(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min; 
        }

        // method to generate the outputs by running the generated inputs
        generate_output(input_string) {
                const proc = spawnSync(this.path_to_binary, { 'input': input_string });
                const output_string = proc.stdout.toString();
                return output_string
        }
        
        // parent method to generate inputs and outputs and append them to file
        generate() {
                for (let i = 0; i < this.num_test_cases; i++) {
                        const input_string = this.input_generator();
                        const output_string = this.generate_output(input_string);
                        
                        fs.appendFileSync(this.path_to_input_file, input_string + "\n");
                        fs.appendFileSync(this.path_to_output_file, output_string + "\n");
                }
        }
}

module.exports.TestCaseGenerator = TestCaseGenerator;
