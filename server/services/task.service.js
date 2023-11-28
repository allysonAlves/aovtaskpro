const puppeteer = require('puppeteer');
const fs = require('fs');
const directoryPaths = require('../utils/directory.utils');
const { getCoockies } = require('./authService');


const syncTask = async() => {
    const url= 'https://project.targetwork.net/projects/zip-aplicativo/work_packages?query_props=%7B%22c%22%3A%5B%22id%22%2C%22subject%22%2C%22type%22%2C%22status%22%2C%22author%22%2C%22updatedAt%22%2C%22project%22%2C%22parent%22%2C%22priority%22%2C%22category%22%2C%22estimatedTime%22%2C%22customField4%22%2C%22spentTime%22%5D%2C%22tv%22%3Afalse%2C%22hl%22%3A%22none%22%2C%22hi%22%3Afalse%2C%22g%22%3A%22%22%2C%22t%22%3A%22updatedAt%3Adesc%2Cid%3Aasc%22%2C%22f%22%3A%5B%7B%22n%22%3A%22status%22%2C%22o%22%3A%22o%22%2C%22v%22%3A%5B%5D%7D%2C%7B%22n%22%3A%22assigneeOrGroup%22%2C%22o%22%3A%22%3D%22%2C%22v%22%3A%5B%22me%22%5D%7D%5D%2C%22pa%22%3A1%2C%22pp%22%3A20%7D';
            
    if (!fs.existsSync(directoryPaths.getCookiesPath())) throw new Error('usuário precisa estar logado para acessar a lista de tarefas!');
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const cookies = getCoockies();        
    await page.setCookie(...cookies);
        
    const response = await page.goto(url);

    const isAuth = await page.waitForFunction((url) => {
        return window.location.href == url;
    }, { timeout: 10000 }, url);

    
    if(!isAuth){ 
        await browser.close();
        throw new Error("Login falhou!");
    }
    
    await page.waitForSelector('.results-tbody.work-package--results-tbody');
    
    const parentElement = await page.$('.results-tbody.work-package--results-tbody');
    
    if (parentElement) {
        const taskArray = await page.evaluate(parentElement => {
            const taskList = [];
            const children = parentElement.children;
            for (var i = 0; i < children.length; i++) {  
                const task = {
                    id: children[i].querySelector('.wp-table--cell-td.id')?.textContent || '',
                    subject: children[i].querySelector('.wp-table--cell-td.subject')?.textContent || '',
                    status: children[i].querySelector('.wp-table--cell-td.status')?.textContent || '',
                    type: children[i].querySelector('.wp-table--cell-td.type')?.textContent || '',
                    category: children[i].querySelector('.wp-table--cell-td.category')?.textContent || '',
                    estimatedTime: children[i].querySelector('.wp-table--cell-td.estimatedTime')?.textContent || '',
                    estimatedTw: children[i].querySelector('.wp-table--cell-td.customField4')?.textContent || '',
                    spentTime: children[i].querySelector('.wp-table--cell-td.spentTime')?.textContent || '',
                } 

                if(task.id && task.subject && task.status)
                taskList.push(task);
            }
            return taskList;
        }, parentElement);        
        
        return taskArray
    }       
    await browser.close();   
    
}

module.exports = {syncTask}