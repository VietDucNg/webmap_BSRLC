# -*- coding: utf-8 -*-
"""
Created on Thu Nov  7 11:10:56 2024

@author: Viet Nguyen (https://vietducng.github.io/)
University of Greifswald (https://geo.uni-greifswald.de/en/eo)
"""

from osgeo import gdal
import os
import glob
from multiprocessing import Pool

# check working directory
os.getcwd()

# change wd
os.chdir(os.getcwd().replace('\\deploy\\python', ''))
os.getcwd()

# get all raster paths
rast_paths = glob.glob('data/*.tif')
rast_paths

# function to convert single-band raster to rgb raster
def to_rgb_func(path):
    year = path.split('_')[1].split('.')[0]
    with gdal.Open(path) as source:
        gdal.DEMProcessing(destName = f'output/colored_raster/bsrlc_{year}_rgb.tif',
                           srcDS = source,
                           processing = 'color-relief',
                           options=gdal.DEMProcessingOptions(
                               colorFilename='data/style.clr',
                               format='GTiff',
                               computeEdges = True,
                               addAlpha = True)) # for some reason, doesn't work with colorSelection='exact_color_entry')
    source = None
    print(f'Completed: {year}')

# multiprocessing
if __name__ == "__main__":
    with Pool(processes = len(rast_paths)+5) as pool:
        pool.map(to_rgb_func, rast_paths)
        pool.close()

# command-line approach
# gdaldem color-relief -of GTiff -exact_color_entry data/BSRLC_2022.tif data/style.clr output/colored_raster/bsrlc_2022_rgb.tif







