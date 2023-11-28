const puppeteer = require('puppeteer');
const fs = require('fs');
const directoryPaths = require('../utils/directory.utils');

const login = async (url) => {

    const urlLogin = url || 'https://project.targetwork.net/my/account';

    const browser = await puppeteer.launch({
        headless: false, // Executar em modo headless ou não
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
    });  

    const page = await browser.newPage();

  try {   

    const response = await page.goto(urlLogin);
    if (!response.ok()) {
      console.error(`Falha ao acessar a página. Código de status: ${response.status()}`);
      return false;
    }

    await page.waitForSelector('#autologin');
    await page.evaluate(() => {
      document.querySelector('#autologin').click();
    });

    // await page.type('#username', 'allyson.vieira@targetwork.com.br');
    // await page.type('#password', 'allTarget12*@');

    await page.waitForFunction((urlLogin) => {
      return window.location.href === urlLogin;
    }, { timeout: 300000 }, urlLogin);

    // Continue com as operações após a URL atingir o valor específico
    const cookies = await page.cookies();    
    const cookiesString = JSON.stringify(cookies, null, 2);   

    if (!fs.existsSync(directoryPaths.localDb)) 
        fs.mkdirSync(directoryPaths.localDb);
        

    // Escreva a string JSON em um arquivo de texto
    fs.writeFileSync(directoryPaths.getCookiesPath(), cookiesString, 'utf-8');

    const formValues = await page.$('.form--section');

    if(formValues){
        const values = await page.evaluate(formElement => {
            return {
                firstName: formElement.querySelector('#user_firstname').value,
                lastName: formElement.querySelector('#user_lastname').value,
                email: formElement.querySelector('#user_mail').value,
                isAuth: true
            }
        },formValues);

        return values;
    }  

  } catch {
    return false
  } finally {
    await browser.close();
  }
}

const checkLogin = async () => {
    const loginUrl = 'https://project.targetwork.net/my/account';
        
    if (!fs.existsSync(directoryPaths.getCookiesPath())) 
        return {isAuth:false};

    //abrir navegador invisível para salvar o coockie que contém o login no coockies.txt
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try{        
        const cookies = getCoockies();        
        await page.setCookie(...cookies);
        
        const response = await page.goto(loginUrl);

        const isAuth = await page.waitForFunction((loginUrl) => {
            return window.location.href == loginUrl;
        }, { timeout: 10000 }, loginUrl);  

        
        const formValues = await page.$('.form--section');
        
        if(!isAuth || !formValues) return {isAuth:false}
        
        const values = await page.evaluate(formElement => {
            return {
                firstName: formElement.querySelector('#user_firstname').value,
                lastName: formElement.querySelector('#user_lastname').value,
                email: formElement.querySelector('#user_mail').value,
                isAuth: true
            }
        },formValues);

        return values;              

    } catch {        
        return false;
    } finally {
        await browser.close();
    }   
    
}

const getAuth = async () => {
    return new Promise( async (resolve,reject) => {        
         const userData = await checkLogin();
         resolve({ ...userData });        
    })
}

const getCoockies = () => {
    const cookiesData = fs.readFileSync(directoryPaths.getCookiesPath(), 'utf-8');       
    return JSON.parse(cookiesData);
}

module.exports = { getAuth, login, getCoockies }