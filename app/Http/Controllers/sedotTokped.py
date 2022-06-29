import sys , json
import os
import time
import re
from urllib.parse import urlencode
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains




# -----------------------------------------------------------
# Created By 958632702  
# Seksi Ekstensifikasi 
# KPP Pratama Jakarta Cengkareng
# -----------------------------------------------------------






class Config(object): 
    def __init__(self, query):
        self.driver = webdriver.PhantomJS()
        self.driver.set_window_size(1120, 550)
        # self.param = query
        self.url = 'https://www.tokopedia.com/search?st=shop&q='+query
        self.query = query


    def eksekusi(self):
        dot = self.driver
        dot.get(self.url)
        # os.mkdir('tesaja')
        dot.implicitly_wait(10)
        link = dot.find_element_by_xpath('/html/body/div[2]/div/div[2]/div/div[2]/div[2]/div[3]/div[1]')
        output = json.dumps(link.text)
        print(""+output)
        # return output


        



        




obj = Config(sys.argv[1])
obj.eksekusi()

        
        
        

