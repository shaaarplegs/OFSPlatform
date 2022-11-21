import requests
import json
import numpy as np
import pandas as pd
import pytest

# Getting all the verticals

def getVerticals():
    return requests.get('https://67xjp60w0e.execute-api.eu-west-1.amazonaws.com/vertical').json()


def test_answer():
    VerticalsDic = getVerticals()
    assert len(VerticalsDic['verticals']) == 0