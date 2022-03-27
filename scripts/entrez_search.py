"""
The script contains functions that implement an entrez search utility on

ncbi databases
"""

import json
import logging
import requests
from requests.exceptions import HTTPError
from os.path import exists

"""
Read script configuration from the config file.

Ensure that the config file is in the same directory 

as this file that reads from it or provide an 

appropriate path to it

"""

assert exists('config.json'), 'Ensure that the config.json file is in the ' \
                              'same directory as this file that reads from ' \
                              'it '

with open('config.json', 'r') as file:
    config = json.loads(file.read())

# Set up basic logging configuration to handle std_out events
logging.basicConfig(
    level=logging.INFO,
    filename=config['logFile'] if config['silentMode'] else None,
    format=config['logFormat'],
)


def search():
    """
    The function executes an NCBI database search functionality
    based on the configuration in the config json file
    """

    def output_to_file(tag, output_file, content):
        """
        A helper function to help with writing content to a file
        :param output_file:
        :param content:
        :return:
        """

        # Add a tag to a file name for easy identification
        split_file = str(output_file).rsplit('/', maxsplit=1)
        tagged_file = f"{split_file[0]}/{tag}_{split_file[1]}"
        with open(tagged_file, 'w') as out:
            for cont in content:
                out.write(f'{cont}\n')

    try:
        """
        Try sending a request to ncbi, if the request executes successfully,
        the program runs silently, else it raises an a detailed exception
        or error on why it was unsuccessful
        
        The parameters used for the request are the ones set in the config file,
        ensure you customise the file to suit your needs
        """
        logging.info('Searching ncbi')
        handles = requests.post(config['baseUrl']['search'], data=config['searchParams'])

        # write the resulting accessions or pubmed ids to a file
        output_to_file(config['fileTag'], config['accessionsFile'], handles.json()['esearchresult']['idlist'])
        handles.raise_for_status()  # only executed on request failure
    except HTTPError as http_error:
        """
        Raises an http error if the the request fail is associated with 
        a problem with the http protocol
        """
        logging.error(f"HTTP error occurred: {http_error}")

    except Exception as e:
        """
        If the request fails with errors not associated with the http 
        protocol, they shall be raised and caught in this block
        """
        logging.error('A non-http error occurred', e)

    else:
        """
        This block executes only on successful execution of the
        request
        """
        logging.info('Search successful')


if __name__ == '__main__':
    search()
