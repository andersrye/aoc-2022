use std::fs;

fn unique_sequence(string: &str, size: usize) -> usize {
    for end in size..string.len() {
        let begin = end-size;
        let slice = &string[begin..end];
        if !slice.chars().enumerate().any(|(i, c)| slice[i+1..].contains(c)) {
            return end;
        }
    }
    return 0
}

fn main() {
    let input = fs::read_to_string("./inputs/06.txt").expect("Should have been able to read the file");

    println!("Answer part 1: {}", unique_sequence(&input, 4));
    println!("Answer part 2: {}", unique_sequence(&input, 14));
}