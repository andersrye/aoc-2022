cycles = File.stream!("./inputs/10.txt")
         |> Stream.map(&String.split/1)
         |> Enum.reduce({1, []}, fn instruction, {register_val, cycles} ->
              case instruction do
                ["noop"] -> {register_val, [[register_val] | cycles]}
                ["addx", num] ->
                  {register_val + String.to_integer(num), [[register_val, register_val] | cycles]}
              end
            end)
         |> elem(1)
         |> Enum.reverse
         |> List.flatten

#Part 1
cycles
|> Stream.take(220)
|> Stream.with_index
|> Stream.filter(fn {_, i} -> (i+1) in [20, 60, 100, 140, 180, 220] end)
|> Enum.map(fn {val, i} -> val*(i+1) end)
|> Enum.sum
|> then(&IO.puts("Part 1 answer = #{&1}"))

#Part 2
IO.puts "Part 2 answer ---v"
cycles
|> Stream.with_index
|> Stream.map(fn {val, i} -> {val, rem(i, 40)} end)
|> Stream.map(fn {val, i} -> abs(val-i) <= 1 end)
|> Stream.map(fn p -> if p do "#" else " " end  end)
|> Stream.chunk_every(40)
|> Enum.each(fn line -> IO.puts(Enum.join(line)) end)