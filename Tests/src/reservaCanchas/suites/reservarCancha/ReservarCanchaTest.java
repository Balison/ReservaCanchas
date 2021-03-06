/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package reservaCanchas.suites.reservarCancha;

import net.sf.sahi.client.Browser;
import org.testng.annotations.*;
import reservaCanchas.common.Config;
import reservaCanchas.common.DDT;
import reservaCanchas.features.menu.TopMenuFeature;
import reservaCanchas.features.reservaCancha.ReservarCanchaFeature;

/**
 *
 * @author Khronos
 */
public class ReservarCanchaTest {

    private Browser browser;
    private ReservarCanchaFeature reservarCancha;

    @Test(dataProvider = "reservarCancha")
    public void AgregarCanchaTest(String nombreTestCase, String nombreCliente,
            String telefono, String repetir, String cancha, String fecha,
            String horaInicio, String horaFin, String resultado) {
        if (resultado.equalsIgnoreCase("Creado")) {
                reservarCancha.reservarCancha(nombreCliente, telefono, repetir,
                        cancha, fecha, horaInicio, horaFin);
        } else {
            //obteniendo valores por defecto
            String defaultNombre = "", defaultTelefono = "", defaultRepetir = "",
                    defaultCancha = "", defaultFecha = "",
                    defaultHoraInicio = "", defaultHoraFin = "";
            if(resultado.equals("Limpiar debe resetear campos")){
                defaultNombre = reservarCancha.getTxt_nombre().getText();
                defaultTelefono = reservarCancha.getTxt_telefono().getValue();
                defaultRepetir = reservarCancha.getCbo_repetir().getSelectedText();
                defaultCancha = reservarCancha.getCbo_cancha().getSelectedText();
                defaultFecha = reservarCancha.getTxt_fecha().getValue();
                defaultHoraInicio = reservarCancha.getTxt_horaInicio().getValue();
                defaultHoraFin = reservarCancha.getTxt_horaFin().getValue();
            }
            reservarCancha.setNombre(nombreCliente);
            reservarCancha.setTelefono(telefono);
            reservarCancha.setRepetir(repetir);
            reservarCancha.setCancha(cancha);
            reservarCancha.setFecha(fecha);
            reservarCancha.setHoraInicio(horaInicio);
            reservarCancha.setHoraFin(horaFin);
            switch (resultado) {
                case "con espacios extra":
                    reservarCancha.Reservar();
                    reservarCancha.verificarCreado(nombreCliente.trim(), telefono,
                            repetir, cancha, fecha, horaInicio, horaFin);
                    break;
                /*case "nombre repetido":
                    reservarCancha.Agregar();
                    reservarCancha.verificarCreado(nombreCliente, telefono,
                            repetir, cancha, horaInicio, horaFin);
                    reservarCancha.setNombre(nombreCliente);
                    reservarCancha.setPrecioHora(telefono);
                    reservarCancha.setTipoCancha(repetir);
                    reservarCancha.setTipoSuelo(cancha);
                    reservarCancha.setHoraInicio(horaInicio);
                    reservarCancha.setHoraFin(horaFin);
                    reservarCancha.Agregar();
                    reservarCancha.verificarMensajeDeError(nombreCliente);
                    break;*/
                case "minima longitud de 3":
                case "sin caracteres especiales":
                case "nombre blanco":
                case "telefono blanco":
                case "telefono no numeral":
                    reservarCancha.Reservar();
                    reservarCancha.verificarNoAgregado(nombreCliente);
                    break;
                case "repeticion no editable":
                    String nuevaRepeticion = repetir + " extra";
                    reservarCancha.getCbo_repetir().setValue(nuevaRepeticion);
                    reservarCancha.verificarNoAgregado(nombreCliente);
                    break;
                case "cancha no editable":
                    String nuevaCancha = cancha + " extra";
                    reservarCancha.getCbo_cancha().setValue(nuevaCancha);
                    reservarCancha.verificarCanchaNoAgregada(nuevaCancha);
                    break;
                case "Limpiar debe resetear campos":
                    reservarCancha.Limpiar();
                    reservarCancha.verificarCampos(defaultNombre,defaultTelefono,
                            defaultRepetir,defaultCancha,defaultFecha,
                            defaultHoraInicio,defaultHoraFin);
                    break;
                default:
                    new Exception("Test Case no soportado");
            }
        }
    }

    @DataProvider(name = "reservarCancha")
    public static Object[][] data() {
        return DDT.DDTReaderFull("DDT/ReservarCancha/ReservarCancha.csv");
    }

    @BeforeMethod
    public void setUpMethod() throws Exception {
        this.browser = Config.getBrowser();
        TopMenuFeature topMenu = new TopMenuFeature(browser);
        reservarCancha = topMenu.gotoReserva();
    }

    @AfterMethod
    public void tearDownMethod() throws Exception {
        //browser.close();
    }
}