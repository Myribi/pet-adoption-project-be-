const isQueryValid = (req,res, next) => {
    if (req.query.type === '') {
      res.status(400).send('Type query empty');
      return;
    }
    if (req.query.adoptionStatus === '') {
      res.status(400).send('Adoption status query empty');
      return;
    }
  
    if (req.query.height === '') {
      res.status(400).send('Height query empty');
      return;
    }
  
    if (req.query.weight === '') {
      res.status(400).send('Weight query empty');
      return;
    }
  
    if (req.query.name === '') {
      res.status(400).send('Name query empty');
      return;
    }
  
    next();
  };

module.exports = {isQueryValid}