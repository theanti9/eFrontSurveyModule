<?php

//This file cannot be called directly, only included.
if (str_replace(DIRECTORY_SEPARATOR, "/", __FILE__) == $_SERVER['SCRIPT_FILENAME']) {
    exit;
}

/*
 * Class defining the new module
 * The name must match the one provided in the module.xml file
 */
class module_survey extends EfrontModule {

    // type lookup
    private $question_types_num = array("likert", "shortanswer");
    private $question_types_assoc = array("likert"=>0, "shortanswer"=>1);



	/**
	 * Get the module name, for example "Demo module"
	 *
	 * @see libraries/EfrontModule#getName()
	 */
    public function getName() {
    	//This is a language tag, defined in the file lang-<your language>.php
        return _MODULE_SURVEY_MODULESURVEY;
    }

	/**
	 * Return the array of roles that will have access to this module
	 * You can return any combination of 'administrator', 'student' or 'professor'
	 *
	 * @see libraries/EfrontModule#getPermittedRoles()
	 */
    public function getPermittedRoles() {
        return array("administrator", "professor", "student");		//This module will be available to administrators
    }

    /**
	 * (non-PHPdoc)
	 * @see libraries/EfrontModule#getCenterLinkInfo()
     */
    public function getCenterLinkInfo() {
    	return array('title' => $this -> getName(),
                     'image' => $this -> moduleBaseLink . 'img/logo.png',
                     'link'  => $this -> moduleBaseUrl);
    }
    
    /**
     * The main functionality
     *
	 * (non-PHPdoc)
	 * @see libraries/EfrontModule#getModule()
     */
    public function getModule() {
    	$smarty = $this -> getSmartyVar();
        $smarty -> assign("T_MODULE_BASEDIR" , $this -> moduleBaseDir);
        $smarty -> assign("T_MODULE_BASELINK" , $this -> moduleBaseLink);
        $smarty -> assign("T_MODULE_BASEURL" , $this -> moduleBaseUrl);


        return true;
    }

    /**
     * Specify which file to include for template
     *
	 * (non-PHPdoc)
	 * @see libraries/EfrontModule#getSmartyTpl()
     */
    public function getSmartyTpl() {
    	return $this -> moduleBaseDir."module_survey_page.tpl";
    }

    
    /**
	 * (non-PHPdoc)
	 * @see libraries/EfrontModule#getNavigationLinks()
     */
    public function getNavigationLinks() {
        return array (array ('title' => _HOME, 'link'  => $_SERVER['PHP_SELF']),
                      array ('title' => $this -> getName(), 'link'  => $this -> moduleBaseUrl));
    }

    public function onInstall() {
        eF_executeNew("CREATE TABLE module_survey_questions (
                    q_id int(11) PRIMARY KEY AUTO_INCREMENT,
                    lesson_id int(11) NOT NULL,
                    question text NOT NULL,
                    question_type tinyint NOT NULL);");
        eF_executeNew("CREATE TABLE module_survey_answers (
                    a_id int(11) PRIMARY KEY AUTO_INCREMENT,
                    q_id int(11) NOT NULL,
                    user_id int(11) NOT NULL,
                    answer text NOT NULL);");
        return true;
    }



}
