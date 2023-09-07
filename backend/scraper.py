from bs4 import BeautifulSoup as bs, SoupStrainer as ss
import requests, cchardet as chardet
requests_session = requests.Session()

#url = "https://menu.dining.ucla.edu/Menus/Sproul/Today/Lunch"
url = "https://menu.dining.ucla.edu/Recipes/977241/6"
r = requests_session.get(url)
soup = bs(r.content, 'lxml')
# for link in soup.find_all('a', {"class" : "recipelink"}):
#     print(link.get('href'))
print(soup.title)
print(soup.select_one('.nfbox').prettify())