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
import org.w3c.dom.NodeList;

public class EliminarPregunta extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        response.setContentType("text/html;charset=UTF-8");
        String id = request.getParameter("id");
        String ruta = request.getRealPath("/"); 
        PrintWriter out = response.getWriter();
        SAXBuilder builder = new SAXBuilder();
        //Obtiene el archivo de preguntas XML
        File xmlFile = new File(ruta+"preguntas.xml");
        try{    
            Document document = (Document) builder.build(xmlFile);
            //Se obtiene el nodo principal y una lista de los nodos "pregunta" que es donde se guarda cada ejercicio
            Element rootNode = document.getRootElement();
            List listaP = rootNode.getChildren("pregunta");
            //Se hace un ciclo for para revisar cada pregunta
            for(int i = 0 ; i < listaP.size(); i++){
                Element node = (Element) listaP.get(i);
                String idrec = node.getAttributeValue("id");
                //Se obtiene el id de la pregunta y se verifica si es el mismo id que se desea eliminar
                if(idrec.equals(id)){
                    //Se desprende el nodo de la lista
                    node.detach();
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
        } catch (JDOMException ex) {
            System.out.println(ex.getMessage());
        }
    }
}