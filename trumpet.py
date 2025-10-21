# Guitar hero but for leaning trumpet
# Key elements: 
# - Visual representation of notes on a staff
# - Visual representation of trumpet fingerings
# - Some way to read in or input music notes (MIDI or MusicXML)
# - Timing mechanism to sync note display with music playback
# - Some internal representation of notes, keys, and timings
import pygame
import music21
import time
from pygame.locals import *
import sys

# Constants
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600

FINGER_POSITIONS = {
    0: [0,0,0], # Open
    1: [1,0,0], # 1st valve
    2: [0,1,0], # 2nd valve
    3: [0,0,1], # 3rd valve
    12: [1,1,0], # 1st and 2nd valves
    13: [1,0,1], # 1st and 3rd valves
    23: [0,1,1], # 2nd and 3rd valves
    123: [1,1,1], # All valves
}
NOTE_FINGERING = {
    'F3#': 123,
    'G3b': 123,
    'G3': 13,
    'G3#': 23,
    'A3b': 23,
    'A3': 12,
    'A3#': 1,
    'B3b': 1,
    'B3': 2,
    'C4': 0,
    'C4#': 123,
    'D4b': 123,
    'D4': 13,
    'D4#': 23,
    'E4b': 23,
    'E4': 12,
    'F4': 1,
    'F4#': 2,
    'G4b': 2,
    'G4': 0,
    'G4#': 23,
    'A4b': 23,
    'A4': 12,
    'A4#': 1,
    'B4b': 1,
    'B4': 2,
    'C5': 0,
    'C5#': 12,
    'D5b': 12,
    'D5': 1,
    'D5#': 2,
    'E5b': 2,
    'E5': 0,
    'F5': 1,
    'F5#': 2,
    'G5b': 2,
    'G5': 0,
    'G5#': 23,
    'A5b': 23,
    'A5': 12,
    'A5#': 1,
    'B5b': 1,
    'B5': 2,
    'C6': 0,
}
