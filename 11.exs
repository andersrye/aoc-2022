defmodule Monkey do
  use Agent

  def start_link(opts) do
    Agent.start_link(fn -> opts end, name: opts.id )
  end

  def inspect_items(monkey, lcm) do
    Agent.update(monkey, fn opts ->
      Enum.each(Enum.reverse(opts.items), fn item ->
        new_worry_level = rem(opts.fn.(item), lcm)
        target_monkey = if opts.test.(new_worry_level) do opts.pos_monkey else opts.neg_monkey end
        Monkey.receive_item(target_monkey, new_worry_level)
      end)
      opts
      |> Map.update!(:inspect_count, fn count -> count + length(opts.items) end)
      |> Map.update!(:items, fn _ -> [] end)
    end)
  end

  def receive_item(monkey, item) do
    Agent.update(monkey, &Map.update!(&1, :items, fn items -> [item | items] end))
  end

  def get_state(monkey) do
    Agent.get(monkey, fn state -> state end)
  end
end

monkeys =  File.read!("./inputs/11.txt")
          |> (&Regex.scan(~r/.+\s(.+):\n.+: (.+)\n.*= old (.*)\n\D*(\d+)\n.*monkey (\d)\n.*(\d)/, &1)).()
          |> Enum.map(fn [_,id,a,b,c,d,e] -> %{
                                               id: String.to_atom(id),
                                               items: String.split(a, ", ")
                                                      |> Enum.map(&String.to_integer/1)
                                                      |> Enum.reverse,
                                               fn: case String.split(b) do
                                                 ["*", "old"] -> &(&1*&1)
                                                 ["+", num] -> &(&1+String.to_integer(num))
                                                 ["*", num] -> &(&1*String.to_integer(num))
                                               end,
                                               test: &(rem(&1, String.to_integer(c)) == 0),
                                               pos_monkey: String.to_atom(d),
                                               neg_monkey: String.to_atom(e),
                                               inspect_count: 0,
                                               test_rem: String.to_integer(c)
                                             } end)
           |> Enum.map(fn opts -> elem(Monkey.start_link(opts), 1) end)

cd = monkeys |> Enum.map(&Monkey.get_state(&1).test_rem) |> Enum.product

Stream.cycle(monkeys)
|> Stream.take(length(monkeys)*10000)
|> Enum.each(&Monkey.inspect_items(&1, cd))

monkeys
|> Enum.map(&(Monkey.get_state(&1).inspect_count))
|> Enum.sort(:desc)
|> Enum.take(2)
|> Enum.product
|> then(&IO.puts("Part 2 answer = #{&1}"))