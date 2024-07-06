import React,{useState} from 'react'
import { Text , View , StyleSheet , TextInput, Button, TouchableHighlight ,Alert , ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';
// Diferencia entre flatlist y ScrollView 
// ScrollView - se cargara automaticamente cuando cargue la aplicacion 
// flatlist - tambien te permite el scroll solo renderizara lo que este visible en el telefono 
// flatlist - como un listado que viene de una base de datos son muchos elementos - require configuracion como vimos
// ScrollView - para algo pequeño como una bienvenida al usuario 

const Formulario = ({citas,setCitas,guardarMostrarForm, guardarCitasStorage} ) => {

    const [paciente, guardarPaciente] = useState('');
    const [propietario, guardarPropietario] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [fecha, guardarFecha] = useState('');
    const [hora, guardarHora] = useState('');
    const [sintomas, guardarSintomas] = useState('');


     const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
     const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarFecha = (date) => {    
    // Mar -->  Marzo - es lo que realiza long
    //en lugar de poner 1 2 , pondra 01 , 01  - el lo que realiza day - 2 digit
    const opciones = {year: 'numeric', month: 'long', day:'2-digit'}
    guardarFecha(date.toLocaleDateString('es-Es', opciones))
    hideDatePicker();
  };


//   Muestra y oculta el TimePicker:
const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const confirmarHora = hora => {
    // el horario de 24 horas hout12: false
    const opciones = {hour : 'numeric', minute: '2-digit'};
    guardarHora(hora.toLocaleString('en-US', opciones))
    hideTimePicker();
  };

// Crear nueva Cita
const crearNuevaCita = () => {
    // Validar
    if(paciente.trim() === '' ||
        propietario.trim === '' ||
        telefono.trim() === '' ||
        fecha.trim() === '' ||
        hora.trim() === ''||
        sintomas.trim() === ''){
            // Falla la validacion
            mostrarAlerta();
            return;
        }

        // Crear una nueva cita
        const cita ={paciente, propietario, telefono, fecha, hora, sintomas};
         // cada cita requiere un id
        cita.id = shortid.generate();
        // Agregar al state

        const citasNuevo =[...citas, cita];
        setCitas(citasNuevo)

        // Pasar las nuevas citas a storage
        guardarCitasStorage(JSON.stringify(citasNuevo))

        // Ocultar el formulario
        guardarMostrarForm(false)
        // Resetear el formulario


       

}
// Muestra la alerta si falla la validacion
const mostrarAlerta = () => {
    Alert-alert(
        'Error', //Titulo
        'Todos los campos son obligatorios', //mensaje
        [{
            text: 'OK' //Arreglo de botones
        }]
        )
}


    return ( 
        <>
            <ScrollView style={styles.formulario}>
                <View >
                    
                    <Text style={styles.label}>Paciente:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => guardarPaciente(texto) }
                        // keyboardType='phone-pad'

                    />
                </View>
                <View >
                    
                    <Text style={styles.label}>Dueño:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => guardarPropietario(texto) }

                        // keyboardType='phone-pad'

                    />
                </View>
                <View >
                    
                    <Text style={styles.label}>Telefono Contacto:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => guardarTelefono(texto) }

                        keyboardType='numeric'

                    />
                </View>
                <View>
                    <Text style={styles.label}>Fecha:</Text>
                    <Button title="Seleccionar la Fecha" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={confirmarFecha}
                        onCancel={hideDatePicker}
                        locale='es_ES'
                        headerTextIOS='Elige la fecha'
                        cancelTextIOS='Cancelar'
                        confirmTextIOS='Confirmar'
                    />
                    <Text> {fecha}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Hora:</Text>
                    <Button title="Seleccionar Hora" onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={confirmarHora}
                        onCancel={hideTimePicker}
                        locale='es_ES'
                        headerTextIOS='Elige una hora'
                        cancelTextIOS='Cancelar'
                        confirmTextIOS='Confirmar'
                        
                    />
                    <Text> {hora}</Text>
                </View>

                <View >
                    
                    <Text style={styles.label}>Sintomas:</Text>
                    <TextInput
                        multiline //para escribir como si fuera un text area
                        style={styles.input}
                        onChangeText={texto => guardarSintomas(texto) }

                        // keyboardType='phone-pad'

                    />
                </View>
                <View>
                    <TouchableHighlight onPress={() => crearNuevaCita()} style={styles.btnSubmit}>
                        <Text style={styles.textoSubmit}>Crear Nueva Cita</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </>
     );
}
const styles = StyleSheet.create({
    formulario:{
        backgroundColor: '#FFF',
        paddingHorizontal:20,
        paddingVertical: 0,
       
        
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20,
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: '#7d024e',
        marginVertical: 10
    },
    textoSubmit:{
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})
 
export default Formulario;