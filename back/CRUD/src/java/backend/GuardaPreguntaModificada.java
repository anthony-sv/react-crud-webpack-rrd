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
        File xmlFile = new File(ruta+"preguntas.xml");
        PrintWriter out = response.getWriter();
        String id = request.getParameter("id");
        String nombre = request.getParameter("nnp");
        String m1 = request.getParameter("nm1");
        String m2 = request.getParameter("nm2");
        String b = request.getParameter("nb");
        String res = request.getParameter("nr");
        try {
            Document document = (Document) builder.build(xmlFile);
            Element rootNode = document.getRootElement();
            List listaP = rootNode.getChildren("pregunta");
            for (int i = 0; i < listaP.size(); i++) {
                Element node = (Element) listaP.get(i);
                if(node.getAttributeValue("id").equals(id)){
                    node.setAttribute("nombre", nombre);
                    node.setAttribute("m1", m1);
                    node.setAttribute("m2", m2);
                    node.setAttribute("b", b);
                    node.setAttribute("respuestas", res);
                    break;
                }
            }
            XMLOutputter xmlOutput = new XMLOutputter();
            xmlOutput.setFormat(Format.getPrettyFormat());
            FileWriter writer = new FileWriter(ruta+"preguntas.xml");                
            xmlOutput.output(document, writer);
            writer.flush();
            writer.close();
            response.sendRedirect("http://localhost:8080/react-crud/"); 
        }catch(IOException io){
            System.out.println(io.getMessage());    
        }catch(JDOMException jdomex){
            System.out.println(jdomex.getMessage());    
        }
    }
}