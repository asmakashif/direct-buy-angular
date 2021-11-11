<?php
    $domainname = $subDomain;
    $ip_server = $_SERVER['SERVER_ADDR'];
    $cPanel = new cPanel("brokeronline", "Default!@#123", $ip_server);
    $my_variable = $cPanel->uapi(
        'SubDomain', 'addsubdomain',
            array(
            'domain'                => $domainname,
            'rootdomain'            => 'brokeronline.in',
            'dir'                   => '/public_html/'.$domainname,
            'disallowdot'           => '1',
        )
    );
    if($my_variable)
    {
        // Enter the name of directory
        $pathdir = "/home/brokeronline/public_html/"; 
          
        // Enter the name to creating zipped directory
        $zipcreated ="/home/brokeronline/public_html/".$domainname."/".$domainname.".zip";
        
          
        // Create new zip class
        $zip = new ZipArchive;
           
        if($zip -> open($zipcreated, ZipArchive::CREATE ) === TRUE) {
              
            // Store the path into the variable
            $dir = opendir($pathdir);
               
            while($file = readdir($dir)) {
                if(is_file($pathdir.$file)) {
                    $zip -> addFile($pathdir.$file, $file);
                }
            }
            $sucsess = $zip ->close();
            if($sucsess)
            {
                echo 'success';
            }
        }
    }
?>