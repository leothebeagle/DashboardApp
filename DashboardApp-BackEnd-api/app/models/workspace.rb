class Workspace < ApplicationRecord
    has_many :events
    has_many :resources, through: :events 
end
