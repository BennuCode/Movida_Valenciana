var MainMenu = React.createClass({
  render: function(){
    return(
      <div className='mainMenu listBody active' id='0'>
        <h1 className='mainMenuItem' onClick={showEspecificMenu.bind(this, 1)}>HOY</h1>
        <h1 className='mainMenuItem' onClick={showEspecificMenu.bind(this, 2)}>Eventos</h1>
        <h1 className='mainMenuItem' onClick={showEspecificMenu.bind(this, 3)}>Fashion</h1>
        <h1 className='mainMenuItem' onClick={showEspecificMenu.bind(this, 4)}>Gastronomia</h1>
        <h1 className='mainMenuItem' onClick={showEspecificMenu.bind(this, 5)}>Tecnologia</h1>
        <h1 className='mainMenuItem' onClick={showEspecificMenu.bind(this, 6)}>Viajes</h1>
      </div>
    );
  }
})