(use '[clojure.string :refer [split]])

(def trees (-> (slurp "./inputs/08.txt")
               (split #"\n")
               (->> (map-indexed (fn [j, y] (map-indexed (fn [i, x] [(str i "." j) (- (int x) 48)]) y))))))

(def trees-transposed (apply map vector trees))

(defn visible-trees [trees]
      (loop [trees trees
             max-height -1
             visible-trees #{}]
            (if (empty? trees)
              visible-trees
              (let [[id height] (first trees)]
                   (if (> height max-height)
                     (recur (rest trees) height (conj visible-trees id))
                     (recur (rest trees) max-height visible-trees))))))

(def output (->> [
                  (map visible-trees trees)
                  (map visible-trees (map reverse trees))
                  (map visible-trees trees-transposed)
                  (map visible-trees (map reverse trees-transposed))
                  ]
                 (flatten)
                 (reduce into)
                 (count)))

(println "Part 1 answer =" output)
