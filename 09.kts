import java.io.File
import kotlin.math.abs
import kotlin.math.max
import kotlin.math.sqrt
import kotlin.math.pow

data class Motion(val direction: String, val steps: Int)

data class Vector(val x: Int, val y: Int) {
    fun length(): Double {
        return sqrt(x.toDouble().pow(2) + y.toDouble().pow(2))
    }
}

data class Point(val x: Int, val y: Int) {
    fun distanceTo(other: Point): Vector {
        return Vector(this.x - other.x, this.y - other.y)
    }
}

class State(numKnots: Int) {
    val knots = Array(numKnots) { Point(0,0) }
    val visited = mutableSetOf<Point>()

    fun moveHead(direction: String) {
        knots[0] = when(direction) {
            "U" -> Point(knots[0].x, knots[0].y+1)
            "D" -> Point(knots[0].x, knots[0].y-1)
            "R" -> Point(knots[0].x+1, knots[0].y)
            "L" -> Point(knots[0].x-1, knots[0].y)
            else -> throw Error("Invalid direction")
        }
        for(i in 1..knots.size-1) {
            val distanceVector = knots[i-1].distanceTo(knots[i])
            val distance = distanceVector.length()
            if(distance >= 2.0) {
                knots[i] = Point(
                    knots[i].x+if(distanceVector.x>0) 1 else if(distanceVector.x<0) -1 else 0,
                    knots[i].y+if(distanceVector.y>0) 1 else if(distanceVector.y<0) -1 else 0,
                )
            }
        }
        visited.add(knots.last())
    }

//    fun print() {
//        val (maxX, maxY) = visited.fold(Pair(0,0), {acc, position ->
//            Pair(max(position.x, acc.first), max(position.y, acc.second))
//        })
//        val a = Array(maxY+1) {Array(maxX+1) { "."} }
//        visited.forEach { a[it.y][it.x] = "#" }
//        a[0][0] = "s"
//        a.reversed().forEach { println(it.joinToString("")) }
//    }
}
val input = File("./inputs/09.txt").readLines()
    .map { it.split(" ")}
    .map { Motion(it[0], it[1].toInt()) }

input.fold(State(2)) { state, command ->
        repeat(command.steps) {
            state.moveHead(command.direction)
        }
        state
    }.let { state ->
        println("Part 1 answer: ${state.visited.count()}")
    }

input.fold(State(10)) { state, command ->
        repeat(command.steps) {
            state.moveHead(command.direction)
        }
        state
    }.let { state ->
        println("Part 2 answer: ${state.visited.count()}")
    }
