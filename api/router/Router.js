var path = require('path');

var AccountRouter = require('./Account.router.js');
var ProductRouter = require('./Product.router.js');
var UserRouter = require('./User.router.js');
var orderRouter = require('./Order.router.js');
exports.Register = function(express){
	var app = express();

	AccountRouter.Register(app);
	ProductRouter.Register(app);
	UserRouter.Register(app);
	orderRouter.Register(app);
	app.get('/', function(request, response){
		response.send('root');
	})
	
	app.use(express.static(path.join(path.resolve(__dirname, '../../'), '/')));

	app.listen(888);
}