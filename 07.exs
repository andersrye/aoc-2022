dir_sizes = File.stream!("./inputs/07.txt")
  |> Stream.map(&String.split/1)
  |> Enum.reduce({[""], %{}}, fn x, {path, sizes} ->
      case x do
        ["$", "cd", "/"] -> {[""], sizes}
        ["$", "cd", ".."] ->
          [_ | parents] = path
          {parents, sizes}
        ["$", "cd", dir] ->
          [cwd | _] = path
          {[cwd <> "/" <> dir | path], sizes}
        ["$", "ls"] -> {path, sizes} # do nothing
        ["dir", _] -> {path, sizes} # do nothing
        [size, _] ->
          parsed_size = String.to_integer(size)
          new_sizes = Enum.reduce(path, sizes, fn dir, acc -> Map.update(acc, dir, parsed_size, &(&1+parsed_size)) end)
          {path, new_sizes}
      end
    end)
  |> elem(1)

# Part 1
dir_sizes
  |> Enum.filter(fn {_, size} -> size <= 100_000 end)
  |> Enum.reduce(0, fn {_, size}, acc -> acc + size end)
  |> then(&(IO.puts("Part 1 = " <> to_string(&1))))

# Part 2
required_space = 30_000_000 - (70_000_000 - dir_sizes[""])
dir_sizes
  |> Stream.filter(fn {_, size} -> size >= required_space end)
  |> Enum.sort(fn {_, size1}, {_, size2} -> size1 < size2 end)
  |> Enum.at(0)
  |> elem(1)
  |> then(&(IO.puts("Part 2 = " <> to_string(&1))))
