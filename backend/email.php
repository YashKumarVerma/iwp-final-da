<?php
    $to      = 'yk.verma2000@gmail.com';
    $subject = 'Test Email';
    $message = 'IWP Project';
    $headers = 'From: dummy@localhost.com'       . "\r\n" .
                 'Reply-To: dummy@localhost' . "\r\n" .
                 'X-Mailer: PHP/' . phpversion();

    mail($to, $subject, $message, $headers);
?>