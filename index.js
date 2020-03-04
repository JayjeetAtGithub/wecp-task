const prompt = require('prompt-sync')();
const spawn = require('child_process').spawn;
const { Readable } = require('stream')
const fs = require('fs');

const INPUTS_FILE_PATH = "input.txt"
const OUTPUTS_FILE_PATH = "output.txt"

// touch the empty input and output files
fs.closeSync(fs.openSync(INPUTS_FILE_PATH, 'w'));
fs.closeSync(fs.openSync(OUTPUTS_FILE_PATH, 'w'));

// function to generate a random number in a given range
function get_rand(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; 
}

// function to generate the inputs of the test cases
function generate_test_case(ube, lbe, ubne, lbne) {
        let num_count = get_rand(lbne, ubne);
        let num_array = new Array();
	for (let i = 0; i < num_count; i++) {
		num_array.push(get_rand(lbe, ube));
        }
        test_cases.push({ 'n': num_count, 'elements': num_array });
}

// function to run the binary on the input, get the output, write to file
function run_binary_and_generate_output(input_string, binary_path) {
        const input_stream = Readable.from(input_string);
        const proc = spawn(binary_path);
        input_stream.pipe(proc.stdin);

        proc.stdout.on('data', function(data) {
                fs.appendFileSync(INPUTS_FILE_PATH, input_string + "\n");
                fs.appendFileSync(OUTPUTS_FILE_PATH, data.toString('ascii'));
        });
}

// take the inputs of the constraints
const num_test_cases = parseInt(prompt('Number of test cases to generate: '));
const upper_bound_num_elements = parseInt(prompt('Upper bound of no. of elements: '));
const lower_bound_num_elements = parseInt(prompt('Lower bound of no. of elements: '));
const upper_bound_element = parseInt(prompt('Upper bound of element: '));
const lower_bound_element = parseInt(prompt('Lower bound of element: '));
const binary_path = prompt('Path to the binary: ');

// generate the inputs of the test cases
test_cases = new Array();
for (let i = 0; i < num_test_cases; i++) {
	generate_test_case(
                upper_bound_element, 
                lower_bound_element, 
                upper_bound_num_elements, 
                lower_bound_num_elements
        );
}

// generate the outputs of the corresponding inputs of the test cases
for (let idx = 0; idx < test_cases.length; idx++) {
        let input_string = test_cases[idx].n + " " + test_cases[idx].elements.join(" ");
        run_binary_and_generate_output(input_string, binary_path);
}
