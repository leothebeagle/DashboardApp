class Event < ApplicationRecord
    has_many :resources
    belongs_to :workspace
end
