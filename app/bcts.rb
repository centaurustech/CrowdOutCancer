class BCTS < Sinatra::Base

	get '/' do
		
		haml :index

	end

end