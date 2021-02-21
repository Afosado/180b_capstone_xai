import io
import torch 
import torch.nn as nn 
import torchvision.transforms as transforms 
from PIL import Image
import json
from caption import caption_image_beam_search, visualize_att

# load model

# class NeuralNet(nn.Module):
#     def __init__(self, input_size, hidden_size, num_classes):
#         super(NeuralNet, self).__init__()
#         self.input_size = input_size
#         self.l1 = nn.Linear(input_size, hidden_size) 
#         self.relu = nn.ReLU()
#         self.l2 = nn.Linear(hidden_size, num_classes)  
    
#     def forward(self, x):
#         out = self.l1(x)
#         out = self.relu(out)
#         out = self.l2(out)
#         # no activation and no softmax at the end
#         return out

# input_size = 784 # 28x28
# hidden_size = 500 
# num_classes = 10
# model = NeuralNet(input_size, hidden_size, num_classes)

# PATH = "mnist_ffn.pth"
# model.load_state_dict(torch.load(PATH))
# model.eval()

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


def get_model(file_name):

    # f = open('caption.json')
    # jsonread = json.load(f) 
    print('start loading')
    checkpoint = torch.load('best.pth.tar', map_location=str(device))
    print('finish loading')

    decoder = checkpoint['decoder']
    decoder = decoder.to(device)
    decoder.eval()
    encoder = checkpoint['encoder']
    encoder = encoder.to(device)
    encoder.eval()
    print('finish building')


    with open('localwordmap.json', 'r') as j:

        word_map = json.load(j)
        rev_word_map = {v: k for k, v in word_map.items()}

    seq, alphas = caption_image_beam_search(encoder, decoder, file_name, word_map, 3)
    alphas = torch.FloatTensor(alphas)
    return seq, alphas, rev_word_map



def get_prediction(file_name):
    seq, alphas, rev_word_map = get_model(file_name)
    return visualize_att(file_name, seq, alphas, rev_word_map, True)



