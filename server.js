var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => 
{

    res.write('Welcome to Rate Calculator');
    res.end();
});

app.post('/getRates', (req, res) => 
{
    var weight = req.body.number;
    var letter = req.body.lettertype;
    var rate = rateCalculator(weight, letter);

    res.render('rate', {
        weight,
        letter,
        rate
    });
    res.end();
});

function rateCalculator(weight, letter) 
{
    var rate = 0;
    var remainder = weight;
    var base = 0;

    if(letter == "stamped")
    {
        base = 0.55;
        if(weight == 1)
        {
            rate = base.toFixed(2);
        }
        else if(weight > 3)
        {
            rate = 0;
        }
        else 
        {
            for (var i = 0; i < weight; i++)
            {
                if(remainder > 1)
                {
                    remainder -= 1;
                    base += .15;
                }
            }
            rate = base.toFixed(2);
        }
    }
    else if(letter == "metered")
    {
        base = 0.50;
        if(weight == 1)
        {
            rate = base.toFixed(2);
        }
        else if(weight > 3)
        {
            rate = 0;
        }
        else 
        {
            for (var i = 0; i < weight; i++)
            {
                if(remainder > 1)
                {
                    remainder -= 1;
                    base += .15;
                }
            }
            rate = base.toFixed(2);
        }
    }
    else if(letter == "flats")
    {
        base = 1.00;
        if(weight == 1)
        {
            rate = base.toFixed(2);
        }
        else 
        {
            for (var i = 0; i < weight; i++)
            {
                if(remainder > 1)
                {
                    remainder -= 1;
                    base += .15;
                }
            }
            rate = base.toFixed(2);
        }
    }

    return rate;
}


app.listen(port);