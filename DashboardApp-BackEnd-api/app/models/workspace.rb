class Workspace < ApplicationRecord
    has_many :events, :dependent => :destroy
end
