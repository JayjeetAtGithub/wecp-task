const { TestCaseGenerator } = require('./lib');

const input_generator_one = function() {
            const arr_len = this.get_rand(
                    this.constraints.lower_bound_arr_len,
                    this.constraints.upper_bound_arr_len);

            let arr_elements = new Array();
            for (let i = 0; i < arr_len; i++) {
                    arr_elements.push(this.get_rand(
                            this.constraints.lower_bound_arr_elem, 
                            this.constraints.upper_bound_arr_elem)
                    );
            }
            
            const input_string = arr_len.toString() + " " + arr_elements.join(" ");
            return input_string;
        }

const input_generator_two = function() {
            const num = this.get_rand(
                    this.constraints.lower_bound_num,
                    this.constraints.upper_bound_num);
            
            const input_string = num.toString();
            return input_string;
}

// test
let test_case_generator_type_one = new TestCaseGenerator(
    "./bin/sample_program_one",
    "./input_one.txt",
    "./output_one.txt",
    input_generator_one,
    10,
    {
            'lower_bound_arr_len': 100, 
            'upper_bound_arr_len': 200,
            'lower_bound_arr_elem': 1,
            'upper_bound_arr_elem': 10000
    }
)

let test_case_generator_type_two = new TestCaseGenerator(
    "./bin/sample_program_two",
    "./input_two.txt",
    "./output_two.txt",
    input_generator_two,
    5,
    {
            'lower_bound_num': 10,
            'upper_bound_num': 10000
    }
)

test_case_generator_type_one.generate();
test_case_generator_type_two.generate();
