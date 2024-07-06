import React,{useState , useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
// Platform es para crear codigo especifico para android o IOS
// TouchableWithoutFeedback - es para que no se resalte al presionar IOS

import { Text , View , StyleSheet, FlatList,  TouchableHighlight ,TouchableWithoutFeedback, Keyboard, Platform} from 'react-native';

import Cita from './componentes/Cita';
import Formulario from './componentes/Formulario';
import  AsyncStorage  from '@react-native-community/async-storage';


const App = ()  => {
  // Definir el state de citas
  const [citas, setCitas] = useState([]);
  const [mostrarform, guardarMostrarForm]=useState(false)

  useEffect(() => {
  const obtenerCitasStorage = async () => {
  try {
    const citasStorage = await AsyncStorage.getItem('citas')
    console.log(citasStorage)
    if(citasStorage){
    setCitas(JSON.parse(citasStorage))
    }
  } catch (error) {
    console.log(error)
  }
  }
  obtenerCitasStorage()
  },[])

// Eliminar los pacinetes del state 
const eliminarPaciente = id => {
  const citasFiltradas  = citas.filter(cita => cita.id !== id);

  setCitas( citasFiltradas)
  guardarCitasStorage(JSON.stringify(citasFiltradas));
}
// Muestra u oculta el formulario
const mostrarFormulario = () => {
  guardarMostrarForm(!mostrarform);
}
// Ocultar el Teclado ayudara para IOS que no lo oculta
const cerrarTeclado = () => {
  Keyboard.dismiss();
}
// Almacena las citas en storage
const guardarCitasStorage = async (citasJSON) => {
  try {
    await AsyncStorage.setItem('citas', citasJSON);

  } catch (error) {
    console.log(error)
  }
}


  return (
    // TouchableWithoutFeedback - donde el usuario puede dar click
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}> 
     <View style={styles.contenedor}>
      <Text style={styles.titulo}>Administrador de Citas</Text>
      <View>
            <TouchableHighlight onPress={() => mostrarFormulario()} style={styles.btnMostrarForm}>
                <Text style={styles.textoMostrarForm}>{mostrarform ? 'Cancelar Cita':  'Crear Nueva Cita'}</Text>
            </TouchableHighlight>
        </View>

      <View style={styles.contenido}>
        {mostrarform ? (
            <>
             <Text style={styles.titulo}>Crear Nueva Cita</Text>
             <Formulario
              setCitas={setCitas}
              citas={citas}
              guardarMostrarForm={guardarMostrarForm}
              guardarCitasStorage={guardarCitasStorage}
              />
             </>
        ): (
          <>
             <Text style={styles.titulo}>{citas.length > 0 ? 'Administrar tus citas' : 'No hay citas, agrega una'}</Text>
              <FlatList
              style={styles.listado}
              //TODO  Datos a renderizar 
                data={citas}
              // TODO Apariencia de los datos  - como se crea un objeto usamo item
                renderItem={({item}) => (
                  <Cita item={item} eliminarPaciente={eliminarPaciente}/>
                )}
                // TODO Pasar un id 
                keyExtractor={citas => citas.id}
              />
        </>
        )}
       

         
      </View>

    </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  contenedor : {
    backgroundColor: '#AA076B',
    flex: 1
  },
  titulo : {
    color: '#FFF', 
    // para tener codigo especifico por SO
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize:23,
    textAlign:'center',
    
  },
  contenido:{
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado:{
    // flex toma todo el espacio disponible
    flex: 1,
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10
},
textoMostrarForm:{
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
}

})



export default App;