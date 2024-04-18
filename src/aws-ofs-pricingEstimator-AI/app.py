## Create a MongoDB client, open a connection to Amazon DocumentDB as a replica set and specify the read preference as secondary preferred 
                    
import pymongo
import sys
import pandas as pd

client = pymongo.MongoClient('#secret')

##Specify the database to be used
db = client.pricing

##Specify the collection to be used
col = db.pricing

cursor = col.find({})
df = pd.DataFrame(cursor)

##Count the number of records in the collection
fsCount = pd.DataFrame(df['FS'].value_counts()).reset_index()
fsCount.columns = ['FS','count']
print(fsCount[fsCount['count'] > 45]['FS'].tolist())


client.close()
