package backend;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;
import org.json.JSONArray;
import org.json.JSONObject;

public class PreguntaPorId extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        String ruta = request.getRealPath("/"); 
        String id = request.getParameter("id");
        SAXBuilder builder = new SAXBuilder();
        //Se obtiene el archivo preguntas XML
        File xmlFile = new File(ruta+"preguntas.xml");
        response.setContentType("application/json");
        response.addHeader("Access-Control-Allow-Origin", "*");
        JSONObject data = new JSONObject();
        try{
            Document document = (Document) builder.build(xmlFile);
            //Obtenemos el nodo principal y una lista de los ejercicios creados
            Element rootNode = document.getRootElement();
            List listaP = rootNode.getChildren("pregunta");
            //Se hace un for para evaluar cada ejercicio
            for(int i = 0 ; i < listaP.size(); i++){
                Element node = (Element) listaP.get(i);
                String idrec = node.getAttributeValue("id");
                //Se comprueba que el id del ejercicio del XML sea igual al id del ejercicio solicitado
                if(idrec.equals(id)){
                    //Se guarda en un JSON toda la informacion del ejercicio
                    JSONObject pregunta = new JSONObject();
                    String dragstxt[] = new String[4];
                    Element d = (Element) node.getChild("ecuaciones");
                    pregunta.put("nombre", node.getAttributeValue("nombre"));
                    pregunta.put("pregunta", node.getAttributeValue("pregunta"));
                    pregunta.put("respuesta", node.getAttributeValue("respuestas"));
                    pregunta.put("hint", node.getAttributeValue("pista"));
                    pregunta.put("id", id);
                    List listaD = d.getChildren("ecuacion");
                    JSONArray arrd = new JSONArray();
                    for(int j = 0; j < listaD.size(); j++){
                        JSONObject drag = new JSONObject();
                        Element op = (Element) listaD.get(j);
                        dragstxt[j] = op.getText();
                        drag.put("ecuacion", dragstxt[j]);
                        arrd.put(drag);
                    }
                    //Ingresamos los datos al JSON y agregamos informacion del status
                    pregunta.put("ecuaciones", arrd);
                    data.put("data", pregunta);
                    data.put("state", 200);
                    data.put("message", "Pregunta encontrada");
                    response.getWriter().write(data.toString());
                    response.getWriter().flush();
                    break;
                }
            }
        }catch(IOException io){
            System.out.println(io.getMessage());
        } catch (JDOMException ex) {
            System.out.println(ex.getMessage());
        }
    }
}