package ide.dpide.servlets;

import ide.dpide.entity.Profile;
import jakarta.mail.Authenticator;
import jakarta.mail.Message;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import java.util.Date;
import java.util.Properties;

public class WorkEmail {
    public void send(Profile userC) {
/*
        final String fromEmail = "no-reply@deprosystem.com";
        final String password = "EVS7QddhNse6HVce";
        final String toEmail = userC.email;
        Properties props = new Properties();
        props.put("mail.smtp.host", "deprosystem.com"); //SMTP Host
*/

        final String fromEmail = "jura@dp-ide.com";
        final String userName = "jura";
        final String password = "eiY3Aiva1eNohPhi";
        final String toEmail = userC.email;
        Properties props = new Properties();
        props.put("mail.smtp.host", "dp-ide.com"); //SMTP Host
//*****************************
        
        props.put("mail.smtp.socketFactory.port", "465"); //SSL Port
        props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory"); //SSL Factory Class
        props.put("mail.smtp.auth", "true"); //Enabling SMTP Authentication
        props.put("mail.smtp.port", "465"); //SMTP Port

        Authenticator auth = new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
//                return new PasswordAuthentication(fromEmail, password);
                return new PasswordAuthentication(userName, password);
            }
        };
        Session session = Session.getInstance(props, auth);
        try
        {
            MimeMessage msg = new MimeMessage(session);
            msg.addHeader("Content-type", "text/HTML; charset=UTF-8");
            msg.addHeader("format", "flowed");
            msg.addHeader("Content-Transfer-Encoding", "8bit");
//            msg.setFrom(new InternetAddress("no-reply@deprosystem.com", "DePro"));
            msg.setFrom(new InternetAddress("jura@dp-ide.com", "DePro"));
            msg.setSubject("DePro Confirmation code", "UTF-8");
            msg.setSentDate(new Date());
            msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail, false));
            String body = Constants.textMail.replace("!!!", String.valueOf(userC.codeConfirm));
            body = Constants.textMail + userC.userName + Constants.textMail_1 + userC.codeConfirm + Constants.textMail_2;
            msg.setContent(body, "text/html" );
            System.out.println("Message is ready");
            Transport.send(msg);
            System.out.println("EMail Sent Successfully!!");
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
