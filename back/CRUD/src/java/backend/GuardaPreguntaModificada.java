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

public class GuardaPreguntaModificada extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        String ruta=request.getRealPath("/"); 
        SAXBuilder builder = new SAXBuilder();
        //Se obtiene el archivo de preguntas XML en la path principal del proyecto
        File xmlFile = new File(ruta+"preguntas.xml");
        PrintWriter out = response.getWriter();
        //Obtenemos todos los elementos que se envían desde el form
        String id = request.getParameter("id");
        String nombre = request.getParameter("nnp");
        String res = request.getParameter("nr");
        String dt1 = request.getParameter("ne1");
        String dt2 = request.getParameter("ne2");
        String dt3 = request.getParameter("ne3");
        String dt4 = request.getParameter("ne4");
        try {
            Document document = (Document) builder.build(xmlFile);
            //Se obtiene el nodo principal y una lista de los nodos "pregunta" que es donde se guarda cada ejercicio
            Element rootNode = document.getRootElement();
            List listaP = rootNode.getChildren("pregunta");
            //Se hace un ciclo for para verificar cada pregunta
            for (int i = 0; i < listaP.size(); i++) {
                Element node = (Element) listaP.get(i);
                //Se obtiene el id del XML y se comprueba con el id de la pregunta a modificar
                if(node.getAttributeValue("id").equals(id)){
                    //Se guardan todo los datos actualizados de la pregunta
                    node.setAttribute("nombre", nombre);
                    node.setAttribute("respuestas", res);
                    Element d = (Element) node.getChild("ecuaciones");
                    List listaD = d.getChildren("ecuacion");
                    Element do1 = (Element) listaD.get(0);
                    Element do2 = (Element) listaD.get(1);
                    Element do3 = (Element) listaD.get(2);
                    Element do4 = (Element) listaD.get(3);
                    do1.setText(dt1);
                    do2.setText(dt2);
                    do3.setText(dt3);
                    do4.setText(dt4);
                    d.setContent(do1);
                    d.addContent(do2);
                    d.addContent(do3);
                    d.addContent(do4);
                    node.setContent(d);
                    break;
                }
            }
            //Se guarda el xml con los nodos sobrantes
            XMLOutputter xmlOutput = new XMLOutputter();
            xmlOutput.setFormat(Format.getPrettyFormat());
            FileWriter writer = new FileWriter(ruta+"preguntas.xml");                
            xmlOutput.output(document, writer);
            writer.flush();
            writer.close();
            //Se hace una redireccion a home
            response.sendRedirect("http://localhost:8080/react-crud/"); 
        }catch(IOException io){
            System.out.println(io.getMessage());    
        }catch(JDOMException jdomex){
            System.out.println(jdomex.getMessage());    
        }
    }
}