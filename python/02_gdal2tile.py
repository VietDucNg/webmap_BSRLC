import os
import glob

# check working directory
os.getcwd()

# change wd
os.chdir(os.getcwd().replace('\\deploy\\python', ''))
os.getcwd()

# get all rgb raster paths
rgb_paths = glob.glob('output/colored_raster/*.tif')
rgb_paths

# get number of CPU core
n_core = os.cpu_count()
n_core

# create command-line code and run gdal2tiles
for path in rgb_paths:
    year = path.split('_')[2]
    cmd = (
        "mamba activate gis &&"
        f"gdal2tiles --profile=mercator --tilesize=512 --tiledriver=WEBP --webp-quality=50 -r bilinear --s_srs=EPSG:3035 -z 0-10 --xyz --exclude --processes={n_core} --webviewer=none {path} output/tiles_raster/{year}"
    )
    os.system(cmd)


# approach 2: create command-line code to use gdal2tiles
# for path in rgb_paths:
#     year = path.split('_')[2]
#     cmd = f"gdal2tiles --profile=mercator --tilesize 512 --tiledriver WEBP -r bilinear --s_srs=EPSG:3035 -z 0-12 --xyz --processes {n_core} --webviewer none {path} output/tiled_raster/{year}"
#     print(f'{cmd} \n')


#### gdal2tiles
# command-line approach
# gdal2tiles --profile=mercator --tilesize=512 --tiledriver=WEBP --webp-quality=50 -r bilinear -z 0-3 --xyz --exclude --processes=40 --webviewer=leaflet output/colored_raster/bsrlc_2000_rgb.tif output/test/