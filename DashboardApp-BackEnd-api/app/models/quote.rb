class Quote < ApplicationRecord
    def self.generate_random
        Quote.limit(1).order(Arel.sql("RANDOM()"))
    end 
end
