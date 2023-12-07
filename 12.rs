use std::fs;
use std::collections::HashSet;

type CharMatrix = Vec<Vec<char>>;
type Point = (usize, usize);

fn get(map: &CharMatrix, (x, y): Point) -> Option<char> {
    match map.get(y)?.get(x) {
        Some(ch) => { Some(*ch) }
        None => { None }
    }
}

fn neighbors(map: &CharMatrix, point: Point) -> Vec<(char, Point)> {
    let (x, y) = point;
    let c = get(&map, point).unwrap();
    [(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)].iter().filter_map(|p| get(&map,*0p));
}

fn main() {
    let input = fs::read_to_string("./inputs/12-sample.txt").expect("Should have been able to read the file");
    let map: CharMatrix = input.split("\n").map(|line| line.chars().collect()).collect();

    println!("{:?}", map.get(100));
}