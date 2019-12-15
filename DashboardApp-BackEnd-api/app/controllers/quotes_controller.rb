class QuotesController < ApplicationController
    def random 
        @random_quote = Quote.generate_random
        render json: @random_quote
    end
end
